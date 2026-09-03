import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Select from "./Select.vue";

const options = [
  { label: "Todos os valores", value: "all" },
  { label: "Até R$ 100", value: "up-to-100" },
  { label: "Acima de R$ 400", value: "above-400" },
];

describe("Select", () => {
  it("renders the label and options", () => {
    const wrapper = mount(Select, {
      props: {
        label: "Filtrar por valor",
        options,
      },
    });

    expect(wrapper.get("label").text()).toContain("Filtrar por valor");
    expect(wrapper.findAll("option").map((option) => option.text())).toEqual([
      "Todos os valores",
      "Até R$ 100",
      "Acima de R$ 400",
    ]);
  });

  it("renders the modelValue as selected value", () => {
    const wrapper = mount(Select, {
      props: {
        label: "Filtrar por valor",
        modelValue: "above-400",
        options,
      },
    });

    expect(wrapper.get("select").element.value).toBe("above-400");
  });

  it("uses an empty string as the default value", () => {
    const wrapper = mount(Select, {
      props: {
        label: "Filtrar por valor",
        options: [{ label: "Selecione", value: "" }],
      },
    });

    expect(wrapper.get("select").element.value).toBe("");
  });

  it("emits update:modelValue when the selected option changes", async () => {
    const wrapper = mount(Select, {
      props: {
        label: "Filtrar por valor",
        modelValue: "all",
        options,
      },
    });

    await wrapper.get("select").setValue("up-to-100");

    expect(wrapper.emitted("update:modelValue")).toEqual([["up-to-100"]]);
  });

  it("forwards native select attributes", () => {
    const wrapper = mount(Select, {
      props: {
        label: "Filtrar por valor",
        options,
      },
      attrs: {
        id: "price-range",
        name: "priceRange",
      },
    });

    const select = wrapper.get("select");

    expect(select.attributes("id")).toBe("price-range");
    expect(select.attributes("name")).toBe("priceRange");
  });
});
