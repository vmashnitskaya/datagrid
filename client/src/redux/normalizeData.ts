const normalizeData = (array: { [key: string]: string }[]) => {
    const dataNormalized = (array as Array<{ [key: string]: any }>).reduce(
        (acc, el) => ({
            ...acc,
            [el._id]: el,
        }),
        {} as { [key: string]: any }
    );
    const allIds = (array as Array<{ [key: string]: any }>).map((el) => el._id);

    return { dataNormalized, allIds };
};

export default normalizeData;
