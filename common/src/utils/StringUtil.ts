export class StringUtil {

    // kebab-case
    public static toKebabCase = (name : string) : string => {
        let result = name;

        if(name && name.length) {
            if(name.includes('_')) {
                result = name.replace(/_/g, "-").toLowerCase();
            } else if(name.includes('-')) {
                result = name.toLowerCase();
            } else {
                result = name
                    .replace(/([A-Z0-9]{0,1}[a-z]+)|([A-Z]{1})/g, '-$&')
                    .split('-').slice(1).join('-').toLowerCase();
            }
        }

        return result;
    }

    // PascalCase
    public static toPascalCase = (name : string) : string => {
        let result = name;

        if (name && name.length) {
            result = "";
            StringUtil.toKebabCase(name).split("-")
                .map((value) => {
                    result +=
                        value.charAt(0).toUpperCase() +
                        value.slice(1).toLowerCase();
                });
        }

        return result;
    }

    // camelCase
    public static toCamelCase = (name : string) : string => {
        const result = StringUtil.toPascalCase(name);
        return result.charAt(0).toLowerCase() + result.slice(1);
    }

    // snake_case
    public static toSnakeCase = (name : string) : string => {
        return StringUtil.toKebabCase(name).replace(/-/g, "_");
    }

    // CONST_CASE
    public static toConstCase = (name : string) : string => {
        return StringUtil.toKebabCase(name).replace(/-/g, "_").toUpperCase();
    }

}