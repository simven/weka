import React from "react";
import { mount } from "enzyme";
import { Questions } from "./Questions";
import { expect } from "chai";

describe("Questions", () => {
    it("renders", () => {
        mount(<Questions />);
    });

    it("display 4 response with related images or not", () => {
        const wrapper = mount(<Questions />);
        expect(
            wrapper.find("FormControl[type='checkbox']").map(el => el.getDOMNode().checked)).to.eql([false,false,false,false]);
    });
});