import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import InputText from "./InputText.vue";

describe("InputText", () => {
  it("renders the modelValue in the input", () => {
    const wrapper = mount(InputText, {
      props: {
        modelValue: "Psicologia",
      },
    });

    const input = wrapper.get("input");

    expect(input.element.value).toBe("Psicologia");
  });

  it("uses an empty string as the default value", () => {
    const wrapper = mount(InputText);

    expect(wrapper.get("input").element.value).toBe("");
  });

  it("emits update:modelValue when the user types", async () => {
    const wrapper = mount(InputText, {
      props: {
        modelValue: "",
      },
    });

    await wrapper.get("input").setValue("Dermatologia");

    expect(wrapper.emitted("update:modelValue")).toEqual([["Dermatologia"]]);
  });

  it("forwards native input attributes", () => {
    const wrapper = mount(InputText, {
      attrs: {
        "aria-label": "Buscar profissional",
        name: "search",
        placeholder: "Digite uma especialidade",
      },
    });

    const input = wrapper.get("input");

    expect(input.attributes("aria-label")).toBe("Buscar profissional");
    expect(input.attributes("name")).toBe("search");
    expect(input.attributes("placeholder")).toBe("Digite uma especialidade");
  });
});
