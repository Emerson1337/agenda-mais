import { TeaService } from './tea.service';
import { TeaRepository } from './repositories/tea.repository';
import { InvalidParamError, MissingParamError } from '@presentation/errors';
import { Validator } from '@domain/validators/validator.interface';
import { ProductValidator } from '@domain/validators/product.validator';
import { makeFakeTea } from './mocks/factories';
import { TeaRepositoryStub } from './mocks/TeaRepositoryStub';

interface SutTypes {
  sut: TeaService;
  teaRepositoryStub: TeaRepository;
  productValidator: Validator;
}

export const makeSut = (): SutTypes => {
  const teaRepositoryStub = new TeaRepositoryStub();
  const productValidator = new ProductValidator();
  const sut = new TeaService(teaRepositoryStub, productValidator);
  return {
    sut,
    teaRepositoryStub,
    productValidator,
  };
};

describe('Tea service', () => {
  test('Should not be able to create tea if no picture is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: 'valid_name',
      picture: '',
      description: 'valid_description',
    };

    const teaResponse = async () => await sut.create(teaRequest);

    expect(teaResponse).rejects.toThrow(new MissingParamError('picture'));
  });

  test('Should not be able to create tea if empty description is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      description: '',
    };

    const teaResponse = async () => await sut.create(teaRequest);
    expect(teaResponse).rejects.toThrow(new MissingParamError('description'));
  });

  test('Should not be able to create tea if empty name is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: '',
      picture: 'valid_picture.png',
      description: 'valid_description',
    };

    const teaResponse = async () => await sut.create(teaRequest);
    expect(teaResponse).rejects.toThrow(new MissingParamError('name'));
  });

  test('Should not be able to create tea if name already registered is provided', async () => {
    const { sut, teaRepositoryStub } = makeSut();
    const teaRequest = {
      name: 'duplicated_name',
      picture: 'valid_picture.png',
      description: 'valid_description',
    };

    jest
      .spyOn(teaRepositoryStub, 'findByName')
      .mockReturnValueOnce(Promise.resolve(makeFakeTea()));

    const teaResponse = async () => await sut.create(teaRequest);

    expect(teaResponse).rejects.toThrow(
      new InvalidParamError('name', 'This name already exists!'),
    );
  });

  test('Should not be able to create tea if short description is provided', async () => {
    const { sut } = makeSut();
    const teaRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      description: 'val',
    };

    const teaResponse = async () => await sut.create(teaRequest);
    expect(teaResponse).rejects.toThrow(
      new InvalidParamError('description', 'Field too short!'),
    );
  });

  test('Should return a tea created if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.create({
      name: 'Tea',
      picture: 'coffe.png',
      description: 'desc',
    });

    expect(httpResponse).toEqual(makeFakeTea());
  });

  test('Should return all teas created', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.list();

    expect(httpResponse).toEqual([makeFakeTea(), makeFakeTea()]);
  });
});
