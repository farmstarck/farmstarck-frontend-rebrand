
export interface productsProps {
    id: number;
    size: string;
    title: string;
    amountFrom: number;
    quantity?: string;
    amountTo: number;
    location: string;
    image: string;
}
export const AllProducts:productsProps[] = [
    {
        size: 'Tuber',
        title: 'Yam 1 Tuber',
        amountFrom: 2500,
        amountTo: 5000,
        location: 'Lagos',
        id:1,
        image: '/assets/images/marketplaces/smallYam.png'
    },
    {
        size: 'Crate',
        id:2,
        title: 'Bull Rice',
        quantity:'50kg',
        amountFrom: 47000,
        amountTo: 54000,
        location: 'Lagos',
        image: '/assets/images/marketplaces/rice.png'
    },
    {
        size: 'Crate',
        title: 'Farm Eggs',
        quantity:'30pcs',
        amountFrom: 4700,
        id:3,
        amountTo: 5400,
        location: 'Lagos',
        image: '/assets/images/marketplaces/eggs.png'
    },
    {
        size: 'Each',
        title: 'Layer Hen',
        id:4,
        amountFrom: 4700,
        amountTo: 5400,
        location: 'Lagos',
        image: '/assets/images/marketplaces/chicken.png'
    },
    {
        size: 'Carton',
        title: 'Green Apple',
        id:5,
        quantity:"1 carton",
        amountFrom: 58500,
        amountTo: 64200,
        location: 'Lagos',
        image: '/assets/images/marketplaces/apples.png'
    },
    {
        size: 'Bag',
        title: 'Soya Bean',
        quantity:'50kg',
        amountFrom: 58500,
        id:6,
        amountTo: 64200,
        location: 'Lagos',
        image: '/assets/images/marketplaces/soya.png'
    },
    {
        size: 'Kilogram',
        title: 'Frozen Cow Meat',
        quantity:'10kg',
        amountFrom: 5800,
        id:7,
        amountTo: 6400,
        location: 'Lagos',
        image: '/assets/images/marketplaces/meat.png'
    },
    {
        size: 'Each',
        title: 'Cassava Fertilizer',
        amountFrom: 20600,
        amountTo: 25900,
        id:8,
        location: 'Lagos',
        image: '/assets/images/marketplaces/fertilizer.png'
    },
    {
        size: 'Kilogram',
        title: 'Dried Ginger',
        quantity:'5kg',
        amountFrom: 19390,
        id:9,
        amountTo: 21900,
        location: 'Lagos',
        image: '/assets/images/marketplaces/ginger.png'
    },
    {
        size: 'Each',
        title: 'Water Can dispenser',
        amountFrom: 15090,
        id:10,
        amountTo: 21900,
        location: 'Benue',
        image: '/assets/images/marketplaces/dispenser.png'
    },
]