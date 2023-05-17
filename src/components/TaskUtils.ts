// utils.ts
export const getCheckboxClass = (completed: boolean): string => {
    return `checkbox checkbox-md border-2 border-secondary rounded-full${completed ? ' checkbox-secondary' : ''}`;
}

// utils.ts
export const getNameClass = (completed: boolean): string => {
    return `text-xl font-normal w-full${completed ? ' line-through decoration-black/50' : ''}`;
}