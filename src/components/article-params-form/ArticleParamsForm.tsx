import { FC, FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
} from 'src/constants/articleProps';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	settings: ArticleStateType;
	onToggle: () => void;
	onChange: (settings: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	isOpen,
	settings,
	onToggle,
	onChange,
	onApply,
	onReset,
}) => {
	const asideRef = useRef<HTMLElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		onReset();
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node) &&
				isOpen
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.fields}>
						<Select
							title='Шрифт'
							selected={settings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								onChange({ ...settings, fontFamilyOption: option })
							}
						/>

						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={settings.fontSizeOption}
							onChange={(option) =>
								onChange({ ...settings, fontSizeOption: option })
							}
						/>

						<Select
							title='Цвет шрифта'
							selected={settings.fontColor}
							options={fontColors}
							onChange={(option) =>
								onChange({ ...settings, fontColor: option })
							}
						/>

						<hr className={styles.separator} />

						<Select
							title='Цвет фона'
							selected={settings.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								onChange({ ...settings, backgroundColor: option })
							}
						/>

						<Select
							title='Ширина контента'
							selected={settings.contentWidth}
							options={contentWidthArr}
							onChange={(option) =>
								onChange({ ...settings, contentWidth: option })
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
