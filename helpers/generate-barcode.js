const generateBarcode = () => {
    const baseNumbers = `000000000${ Math.floor( Math.random() * 1000000000 ) }`;
    return baseNumbers.slice(-9);
}