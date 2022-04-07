/**
 * Separates individual SQL statements, split by a delimiter, into an array of statements
 * @param {String} text
 * @returns {String[]}
 */
export function separateSqlCommands(text) {
    let lines = text.split('\n')
        .filter(str => {
            return str.length
                && !/^\n*$/.test(str);
        });

    let delimiter = ';';
    const DELIMITER_REGEX = /DELIMITER (.+)/;

    let statements = [];

    let accumulator = '';

    for(const line of lines) {
        let regexpResult = DELIMITER_REGEX.exec(line);
        if(regexpResult) {
            statements = statements.concat(accumulator.split(delimiter));

            accumulator = '';
            delimiter = regexpResult[1];
        } else {
            accumulator += line + ' ';
        }
    }

    statements = statements.filter(statement => !/^\s*$/.test(statement))
        .map(statement => {
            if(statement[0] === ' ') statement = statement.substr(1);

            return statement.replace(/\t/g, ' ')
                .replace(/ +/g, ' ');
        })
        .map(statement => statement.replace(/ +/g, ' '));

    return statements;
}