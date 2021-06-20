import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

import { Loader } from '../../components/Loader/Loader';

import './Page.css';

export const cnPage = cn('Page');

export interface IPageProps {
	loading?: boolean;
}

/**
 * Component for represent any standalone page
 */
export const Page: FC<IPageProps> = ({ children, loading }) => {
	return (
		<div className={cnPage()}>
			{loading ? (
				<div className={cnPage('Placeholder')}>
					<Loader />
				</div>
			) : (
				<div className={cnPage('Body')}>{children}</div>
			)}
		</div>
	);
};
