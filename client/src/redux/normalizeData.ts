const normalizeData = (array: { [key: string]: string }[]) => {
    const dataNormalized = (array as Array<{ [key: string]: any }>).reduce(
        (acc, el) => ({
            ...acc,
            [el.id]: el,
        }),
        {} as { [key: string]: any }
    );
    const allIds = (array as Array<{ [key: string]: any }>).map((el) => el.id);

    return { dataNormalized, allIds };
};

export default normalizeData;
