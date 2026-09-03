import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Pagination from "./Pagination.vue";

describe("Pagination", () => {
  it("renders the navigation controls and visible pages", () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 10,
      },
    });

    expect(wrapper.get("nav").attributes("aria-label")).toBe("Paginação");
    expect(wrapper.text()).toContain("Anterior");
    expect(wrapper.text()).toContain("Próxima");
    expect(wrapper.text()).toContain("1");
    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("6");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.findAll(".pagination__ellipsis")).toHaveLength(2);
  });

  it("marks the current page as active", () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 3,
      },
    });

    const currentPageButton = wrapper
      .findAll("button")
      .find((button) => button.text() === "2");

    expect(currentPageButton?.attributes("aria-current")).toBe("page");
    expect(currentPageButton?.classes()).toContain("pagination__button--active");
  });

  it("disables previous on the first page and next on the last page", () => {
    const firstPageWrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 3,
      },
    });

    const lastPageWrapper = mount(Pagination, {
      props: {
        currentPage: 3,
        totalPages: 3,
      },
    });

    expect(firstPageWrapper.get("button").attributes()).toHaveProperty("disabled");
    expect(lastPageWrapper.findAll("button").at(-1)?.attributes()).toHaveProperty("disabled");
  });

  it("emits update:currentPage when navigating to another page", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 4,
      },
    });

    await wrapper
      .findAll("button")
      .find((button) => button.text() === "3")
      ?.trigger("click");

    expect(wrapper.emitted("update:currentPage")).toEqual([[3]]);
  });

  it("does not emit when clicking the current page", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 4,
      },
    });

    await wrapper
      .findAll("button")
      .find((button) => button.text() === "2")
      ?.trigger("click");

    expect(wrapper.emitted("update:currentPage")).toBeUndefined();
  });
});
