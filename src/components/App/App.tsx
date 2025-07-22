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
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setAppliedSettings(parsed);
				setFormSettings(parsed);
			} catch (e) {
				setAppliedSettings(defaultArticleState);
				setFormSettings(defaultArticleState);
			}
		}
	}, []);

	const handleApply = () => {
		setAppliedSettings(formSettings);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(formSettings));
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		setAppliedSettings(defaultArticleState);
		localStorage.removeItem(STORAGE_KEY);
	};

	const handleToggleSidebar = () => setSidebarOpen(!isSidebarOpen);
	const handleChangeSettings = (newSettings: ArticleStateType) =>
		setFormSettings(newSettings);

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
				isOpen={isSidebarOpen}
				settings={formSettings}
				onToggle={handleToggleSidebar}
				onChange={handleChangeSettings}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
