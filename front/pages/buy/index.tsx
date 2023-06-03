import { GetServerSideProps, NextPage } from "next";
import { useState, useContext } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Link from "next/link";
import { MyContext } from "../_app";

type TypePlan = {
	id: number;
	name: string;
	explanation: string;
	price: number;
	image: string;
	stripe_price_id: string;
};

type TypeUser = {
	id: number;
	name: string;
	email: string;
	family_id: number;
	phonetic: string;
	zipcode: string;
	prefecture: string;
	city: string;
	town: string;
	apartment: string;
	phone_number: string;
	is_owner: boolean;
};

type BuyProps = {
	apiURL: string;
	paidUser: TypeUser;
	receivedUser: TypeUser;
	plan: TypePlan;
};
const Buy: NextPage<BuyProps> = ({ apiURL }) => {
	const contextValue = useContext(MyContext);
	const plan = contextValue.plan;
	const paidUser = contextValue.paidUser;
	const receivedUser = contextValue.receivedUser;
	const quantity = contextValue.orderQuantity;
	const order = {
		paiduser_id: paidUser.id,
		receiveduser_id: receivedUser.id,
		plan_id: plan.id,
		stripe_id: plan.stripe_price_id,
	};

	const onCreateCheckoutSesstion = async (e: React.FormEvent) => {
		await axios.post(`${apiURL}buy`, order).then((res) => {
			console.log(res.data.sessionURL);
			const sessionURL = res.data.sessionURL;
			window.location.href = sessionURL;
		});
	};

	return (
		<Layout>
			<h2>注文情報</h2>
			<p>
				いつでも定期便の停止や解約が可能です。
				<br />
				また配送間隔やおかずセットの変更も可能です。
			</p>
			<section>
				<div>
					<h3>自宅にお届け</h3>
					<div>
						<h4>お届け先住所</h4>
						<dl>
							<dt>名前</dt>
							<dd>{receivedUser.name}</dd>
							<dt>住所</dt>
							<dd>
								<span>〒{receivedUser.zipcode}</span>
								{receivedUser.prefecture}
								{receivedUser.city}
								{receivedUser.town}
								{receivedUser.apartment}
							</dd>
							<dt>電話番号</dt>
							<dd>{receivedUser.phone_number}</dd>
						</dl>
						<div>変更</div>
					</div>
					<div>
						<div>
							<img src={plan.image} alt={plan.name} />
						</div>
						<h4>
							<span>定期便</span>
							<p>{plan.explanation}</p>
						</h4>
						<p></p>
						<p>数量：{quantity}</p>
					</div>
				</div>
			</section>

			<button onClick={onCreateCheckoutSesstion}>お支払情報を入力して購入手続きをする</button>
			<p>まだ購入は確定されません</p>
		</Layout>
	);
};

export default Buy;

export const getServerSideProps: GetServerSideProps = async () => {
	const apiURL = process.env.API_URL;
	return {
		props: {
			apiURL: apiURL,
		},
	};
};
