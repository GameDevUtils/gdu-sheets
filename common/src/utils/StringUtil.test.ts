import StringUtil from "./StringUtil";

describe("StringUtil", () => {

    describe("text casing", () => {

        test("converts string to kabob case", () => {
            expect(StringUtil.toKebabCase("TestProject")).toBe("test-project");
            expect(StringUtil.toKebabCase("includeAt2x")).toBe("include-at-2x");
            expect(StringUtil.toKebabCase("Include2x")).toBe("include-2x");
            expect(StringUtil.toKebabCase("INCLUDE_AT_2X")).toBe("include-at-2x");
            expect(StringUtil.toKebabCase("INCLUDE_2X")).toBe("include-2x");
            expect(StringUtil.toKebabCase("this-is-a-test")).toBe("this-is-a-test");
            expect(StringUtil.toKebabCase("a")).toBe("a");
            expect(StringUtil.toKebabCase("")).toBe("");
        });

        test("converts string to camel case", () => {
            expect(StringUtil.toCamelCase("TestProject")).toBe("testProject");
            expect(StringUtil.toCamelCase("includeAt2x")).toBe("includeAt2x");
            expect(StringUtil.toCamelCase("Include2x")).toBe("include2x");
            expect(StringUtil.toCamelCase("INCLUDE_AT_2X")).toBe("includeAt2x");
            expect(StringUtil.toCamelCase("INCLUDE_2X")).toBe("include2x");
            expect(StringUtil.toCamelCase("this-is-a-test")).toBe("thisIsATest");
            expect(StringUtil.toCamelCase("a")).toBe("a");
            expect(StringUtil.toCamelCase("")).toBe("");
        });

        test("converts string to pascal case", () => {
            expect(StringUtil.toPascalCase("TestProject")).toBe("TestProject");
            expect(StringUtil.toPascalCase("includeAt2x")).toBe("IncludeAt2x");
            expect(StringUtil.toPascalCase("Include2x")).toBe("Include2x");
            expect(StringUtil.toPascalCase("INCLUDE_AT_2X")).toBe("IncludeAt2x");
            expect(StringUtil.toPascalCase("INCLUDE_2X")).toBe("Include2x");
            expect(StringUtil.toPascalCase("this-is-a-test")).toBe("ThisIsATest");
            expect(StringUtil.toPascalCase("a")).toBe("A");
            expect(StringUtil.toPascalCase("")).toBe("");
        });

        test("converts string to snake case", () => {
            expect(StringUtil.toSnakeCase("TestProject")).toBe("test_project");
            expect(StringUtil.toSnakeCase("includeAt2x")).toBe("include_at_2x");
            expect(StringUtil.toSnakeCase("Include2x")).toBe("include_2x");
            expect(StringUtil.toSnakeCase("INCLUDE_AT_2X")).toBe("include_at_2x");
            expect(StringUtil.toSnakeCase("INCLUDE_2X")).toBe("include_2x");
            expect(StringUtil.toSnakeCase("this-is-a-test")).toBe("this_is_a_test");
            expect(StringUtil.toSnakeCase("a")).toBe("a");
            expect(StringUtil.toSnakeCase("")).toBe("");
        });

        test("converts string to const case", () => {
            expect(StringUtil.toConstCase("TestProject")).toBe("TEST_PROJECT");
            expect(StringUtil.toConstCase("includeAt2x")).toBe("INCLUDE_AT_2X");
            expect(StringUtil.toConstCase("Include2x")).toBe("INCLUDE_2X");
            expect(StringUtil.toConstCase("INCLUDE_AT_2X")).toBe("INCLUDE_AT_2X");
            expect(StringUtil.toConstCase("INCLUDE_2X")).toBe("INCLUDE_2X");
            expect(StringUtil.toConstCase("this-is-a-test")).toBe("THIS_IS_A_TEST");
            expect(StringUtil.toConstCase("a")).toBe("A");
            expect(StringUtil.toConstCase("")).toBe("");
        });

    });

});
