import { atom } from "recoil";

type Plan = {
	id: number;
	name: string;
	explanation: string;
	price: string;
	image: string;
	stripe_price_id: string;
};

type User = {
	id: number;
	name: string;
	email: string;
	postal_code: string;
	state: string;
	city: string;
	line1: string;
	line2: string;
	phone_number: string;
	is_owner: boolean;
	is_virtual_user: boolean;
};
type CartItem = {
	plan: Plan;
	paidUser: User;
	receivedUser: User;
};
const initialOrder = {
	plan: {
		id: 0,
		name: "",
		explanation: "",
		price: "",
		image: "",
		stripe_price_id: "",
	},
	paidUser: {
		id: 0,
		name: "",
		email: "",
		postal_code: "",
		state: "",
		city: "",
		line1: "",
		line2: "",
		phone_number: "",
		is_owner: false,
		is_virtual_user: false,
	},
	receivedUser: {
		id: 0,
		name: "",
		email: "",
		postal_code: "",
		state: "",
		city: "",
		line1: "",
		line2: "",
		phone_number: "",
		is_owner: false,
		is_virtual_user: false,
	},
};
const initialCart: CartItem[] = [];

export const cartState = atom({
	key: "cartState",
	default: initialCart,
});

export const orderState = atom({
	key: "orderState",
	default: initialOrder,
});
