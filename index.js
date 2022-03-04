import people from "./mocks/people.mock";

class SimpleParser {
    data = people;

    parse(query) {
        const beforeFirstSquareBracket = /^.*?(?=\[)/g;
        const charsInBrackets = /(?<=\[)(.*?)(?=\])/g;
        const normalizedQuery = this.normalizeQuery(query);

        const querySegment = normalizedQuery.split(",");

        const keys = querySegment.map((querySegment) => {
            return querySegment.match(beforeFirstSquareBracket)[0];
        });

        const parameters = querySegment.map((querySegment) => {
            return querySegment.match(charsInBrackets)[0];
        });

        let criteria = {};

        const length = keys.length;

        for (let i = 0; i < length; i++) {
            const objectKey = keys[i];
            criteria = {...criteria, [objectKey]: parameters[i]};
        }

        this.filterBy(criteria);
    }

    filterBy(criteria) {
        let filtered = this.data;

        const criteriaKeys = Object.keys(criteria);

        criteriaKeys.forEach((key, index) => {
            filtered = this.data.filter((person) => {
                return person[key] === criteria[key];
            })
        })

        console.log(filtered);

    }

    normalizeQuery(query) {
        return query
            .replaceAll("'", "")
            .replaceAll("\"", "")
            .replaceAll(" ", "");
    }
}

// age[23-40]
// gender[male]

new SimpleParser().parse("age[23-40], gender['male']");