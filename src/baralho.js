const baralho = [
    {
        nome: 'Piu-Piu',
        custo: 1,
        energia: 1,
        forca: 2
    },
    {
        nome: 'Frajola',
        custo: 1,
        energia: 1,
        forca: 1
    },
    {
        nome: 'Eufrazino',
        custo: 2,
        energia: 2,
        forca: 2
    },
    {
        nome: 'Pernalonga',
        custo: 2,
        energia: 2,
        forca: 3
    },
    {
        nome: 'Coiote',
        custo: 3,
        energia: 3,
        forca: 3
    },
    {
        nome: 'Papa-leguas',
        custo: 3,
        energia: 3,
        forca: 4
    },
    {
        nome: 'Jerry',
        custo: 4,
        energia: 4,
        forca: 6
    },
    {
        nome: 'Zeca-Urubu',
        custo: 5,
        energia: 5,
        forca: 7
    },
    {
        nome: 'Pica-Pau',
        custo: 5,
        energia: 5,
        forca: 8
    },
    {
        nome: 'Tom',
        custo: 4,
        energia: 4,
        forca: 5
    },
    {
        nome: 'Homem-de-Ferro',
        custo: 6,
        energia: 6,
        forca: 9
    },
    {
        nome: 'Thanos',
        custo: 6,
        energia: 6,
        forca: 10
    },
    {
        nome: 'Hulk',
        custo: 6,
        energia: 6,
        forca: 9
    },
    {
        nome: 'Dr-Estranho',
        custo: 6,
        energia: 6,
        forca: 9
    },
]

export function getBaralho(){
    return structuredClone(baralho)
}