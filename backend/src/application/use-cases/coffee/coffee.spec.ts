import { CoffeeService } from './coffee.service';
import { CoffeeRepository } from './repositories/coffee.repository';
import { InvalidParamError, MissingParamError } from '@presentation/errors';
import { Validator } from '@domain/validators/validator.interface';
import { ProductValidator } from '@domain/validators/product.validator';
import { CoffeeRepositoryStub } from './mocks/CoffeeRepositoryStub';
import { makeFakeCoffee } from './mocks/factories';

interface SutTypes {
  sut: CoffeeService;
  coffeeRepositoryStub: CoffeeRepository;
  productValidator: Validator;
}

const makeSut = (): SutTypes => {
  const coffeeRepositoryStub = new CoffeeRepositoryStub();
  const productValidator = new ProductValidator();
  const sut = new CoffeeService(coffeeRepositoryStub, productValidator);
  return {
    sut,
    coffeeRepositoryStub,
    productValidator,
  };
};

describe('Coffee service', () => {
  test('Should not be able to create coffee if no picture is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: '',
      type: 'ROBUSTA',
      description: 'valid_description',
    };

    const coffeeResponse = async () => await sut.create(coffeeRequest);

    await expect(coffeeResponse).rejects.toThrow(
      new MissingParamError('picture'),
    );
  });

  test('Should not be able to create coffee if empty description is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      type: 'ROBUSTA',
      description: '',
    };

    const coffeeResponse = async () => await sut.create(coffeeRequest);
    await expect(coffeeResponse).rejects.toThrow(
      new MissingParamError('description'),
    );
  });

  test('Should not be able to create coffee if empty name is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: '',
      picture: 'valid_picture.png',
      type: 'ROBUSTA',
      description: 'valid_description',
    };

    const coffeeResponse = async () => await sut.create(coffeeRequest);
    await expect(coffeeResponse).rejects.toThrow(new MissingParamError('name'));
  });

  test('Should not be able to create coffee if name already registered is provided', async () => {
    const { sut, coffeeRepositoryStub } = makeSut();
    const coffeeRequest = {
      name: 'duplicated_name',
      picture: 'valid_picture.png',
      type: 'ROBUSTA',
      description: 'valid_description',
    };

    jest
      .spyOn(coffeeRepositoryStub, 'findByName')
      .mockReturnValueOnce(Promise.resolve(makeFakeCoffee()));

    const coffeeResponse = async () => await sut.create(coffeeRequest);

    await expect(coffeeResponse).rejects.toThrow(
      new InvalidParamError('name', 'This name already exists!'),
    );
  });

  test('Should not be able to create coffee if short description is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      type: 'ROBUSTA',
      description: 'val',
    };

    const coffeeResponse = async () => await sut.create(coffeeRequest);
    await expect(coffeeResponse).rejects.toThrow(
      new InvalidParamError('description', 'Field too short!'),
    );
  });

  test('Should not be able to create coffee if invalid type is provided', async () => {
    const { sut } = makeSut();
    const coffeeRequest = {
      name: 'valid_name',
      picture: 'valid_picture.png',
      type: 'invalid_type',
      description: 'valid_description',
    };

    const coffeeResponse = async () => await sut.create(coffeeRequest);
    await expect(coffeeResponse).rejects.toThrow(
      new InvalidParamError('type', 'values acceptable: ROBUSTA or ARABIC!'),
    );
  });

  test('Should return a coffee created if valid data is provided', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.create({
      name: 'Coffee',
      picture: 'coffe.png',
      type: 'ROBUSTA',
      description: 'desc',
    });

    expect(httpResponse).toEqual(makeFakeCoffee());
  });

  test('Should return all coffees created', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.list();

    expect(httpResponse).toEqual([makeFakeCoffee(), makeFakeCoffee()]);
  });
});
