import { Tea } from "./tea";

it("is a valid Tea", () => {
  expect(
    new Tea({
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      created_at: new Date(2012, 1, 1),
    }).name
  ).toEqual("GEPA Chiapas with two lines");

  expect(
    new Tea({
      name: "good for espresso in Italy",
      description: "test",
      picture: "/assets/image.png",
      created_at: new Date(2012, 1, 1),
    }).name
  ).toEqual("good for espresso in Italy");
});

it.skip("getDate", () => {
  // TODO - Fix me
  expect(
    new Tea({
      name: "good for espresso in Italy",
      description: "test",
      picture: "/assets/image.png",
      created_at: new Date(2012, 1, 1),
    }).getDate()
  ).toEqual("2012-01-31T23:00:00.000Z");
});
