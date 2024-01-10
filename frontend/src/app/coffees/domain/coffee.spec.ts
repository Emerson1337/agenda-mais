import { Coffee } from "./coffee";

it("is a valid Coffee", () => {
  expect(
    new Coffee({
      name: "GEPA Chiapas with two lines",
      description: "test",
      picture: "/assets/image.png",
      type: "ARABIC",
      created_at: new Date(2012, 1, 1),
    }).name
  ).toEqual("GEPA Chiapas with two lines");

  expect(
    new Coffee({
      name: "good for espresso in Italy",
      description: "test",
      picture: "/assets/image.png",
      type: "ARABIC",
      created_at: new Date(2012, 1, 1),
    }).name
  ).toEqual("good for espresso in Italy");
});

it.skip("getDate", () => {
  // TODO - Fix me
  expect(
    new Coffee({
      name: "good for espresso in Italy",
      description: "test",
      picture: "/assets/image.png",
      type: "ARABIC",
      created_at: new Date(2012, 1, 1),
    }).getDate()
  ).toEqual("2012-01-31T23:00:00.000Z");
});
