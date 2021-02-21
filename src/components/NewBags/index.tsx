import { GetStaticProps } from "next";

import useSWR from "swr";

import { NewBag } from "components/NewBag/index";

import { fetcher } from "helpers/fetcher";

import { ErrorFetch } from "types/interfaces/ErrorFetch";
import { INewBag } from "types/interfaces/INewBag";

import { Container, Error } from "./styles";

import { Loading } from "./Loading/";

interface Props {
	initialData?: any;
}

interface Data {
	newBags?: Array<INewBag>;
}

export const NewBags: React.FC<Props> = ({ initialData }) => {
	const { data, error } = useSWR<Data, ErrorFetch>(
		"https://dbags.herokuapp.com/public/newbags",
		fetcher,
		{ initialData },
	);

	return (
		<Container>
			<h1>NOVIDADES</h1>
			{data && (
				<ul>
					{data.newBags?.map((bag: INewBag, index) => (
						<NewBag
							id={bag.id}
							name={bag.name}
							retail_price={bag.retail_price}
							retail_price_discount={bag.retail_price_discount}
							material_type={bag.material_type}
							handle_type={bag.handle_type}
							main_img_path={bag.main_img_path}
							direction={index % 3 === 0 ? false : true}
							key={bag.id}
						/>
					))}
				</ul>
			)}
			{!data && !error && <Loading />}
			{error && <Error>Ocorreu um problema.</Error>}
		</Container>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const data = await fetcher("https://dbags.herokuapp.com/public/newbags");
	return { props: { initialData: data } };
};
