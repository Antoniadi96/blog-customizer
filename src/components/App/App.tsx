import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from 'src/styles/index.module.scss';

const STORAGE_KEY = 'appliedSettings';

export const App = () => {
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				if (
					parsed.fontFamilyOption &&
					parsed.fontSizeOption &&
					parsed.fontColor &&
					parsed.contentWidth &&
					parsed.backgroundColor
				) {
					setAppliedSettings(parsed);
				} else {
					setAppliedSettings(defaultArticleState);
				}
			} catch (e) {
				console.warn('Ошибка парсинга localStorage:', e);
				setAppliedSettings(defaultArticleState);
			}
		}
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(appliedSettings));
		}
	}, [appliedSettings, isLoaded]);

	if (!isLoaded) return null;

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm
				articleStyles={appliedSettings}
				setArticleStyles={setAppliedSettings}
			/>
			<Article />
		</main>
	);
};
