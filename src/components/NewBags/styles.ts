import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	> h1 {
		padding: 1.5rem;
		font-size: 3rem;
		font-family: "Roboto Mono", monospace;
	}
`;

export const Error = styled.span`
	font-size: 1.25rem;
`;
