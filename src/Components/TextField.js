import React from 'react';

import styled from 'styled-components';

const Input = styled.input`
	border: 1px solid ${props => props.theme.color};
	min-height: 35px;
	margin-bottom: 0.5rem;
	font-size: 17px;
	width: auto;
	display: initial;
`;

const Label = styled.span`
	color: ${props => props.theme.color};
	width: auto;
`;

export const TextField = ({ label, errors, ...props }) => {
	return (
		<span>
			<Label>{label}</Label>
			<br />
			<Input {...props} />
			<span className="text text-danger">{errors}</span>
		</span>
	);
};
