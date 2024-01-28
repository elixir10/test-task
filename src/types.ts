type routeFunctions = Map<string, Function>;
type answerType = 1 | 2 | 3;

interface NoteFunction {
    name: string,
    exec: () => unknown
}

interface Note {
    title: string,
    content: string
}

export {
    routeFunctions,
    NoteFunction,
    Note,
    answerType
}