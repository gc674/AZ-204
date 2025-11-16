import clsx from 'clsx';
import type { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react';
import React from 'react';
import { InputStyle } from '~/components/Input';
import { Markdown } from '~/components/Markdown';

interface AnswerOptionsProps {
	name: string;
	options: string[];
	checkedValues: number[];
	setCheckedValues: Dispatch<SetStateAction<number[]>>;
	showAnswer: boolean;
	answerIndexes: number[];
	disabled?: boolean;
}

const AnswerOptionsComponent: FC<AnswerOptionsProps> = ({
	name,
	options,
	checkedValues,
	setCheckedValues,
	showAnswer,
	answerIndexes,
	disabled,
}) => {
	const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
		const { checked, value, type } = event.target;

		const index = Number.parseInt(value, 10);

		if (type === 'checkbox') {
			if (checked) {
				// Add to checked values
				setCheckedValues((prev) => [...prev, index]);
			} else {
				// Remove from checked values
				setCheckedValues((prev) => prev.filter((v) => v !== index));
			}
		} else if (type === 'radio') {
			if (checked) {
				// Set checked value to the selected radio button
				setCheckedValues([index]);
			}
		}
	};

	   return (
		   <ul className="list-none p-0">
			   {options.map((option: string, index: number) => (
				   <li key={`${option}-${index}`} className="mb-2">
					   <label
						   className={clsx(
							   InputStyle,
							   'border border-[var(--color-border)] cursor-pointer relative',
							   (showAnswer || checkedValues.includes(index)) &&
								   answerIndexes.includes(index)
								   ? 'bg-green-200 text-black dark:text-black'
								   : checkedValues.includes(index)
									   ? 'bg-red-200 text-black dark:text-black'
									   : 'bg-[var(--color-surface)] text-[var(--color-text)]',
							   'focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2',
						   )}
					   >
						   <input
							   type={answerIndexes.length < 2 ? 'radio' : 'checkbox'}
							   checked={checkedValues.includes(index)}
							   onChange={handleChange}
							   className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]" 
							   value={index}
							   name={name}
							   disabled={disabled}
							   aria-checked={checkedValues.includes(index)}
						   />
						<Markdown
							components={
								(showAnswer || checkedValues.includes(index)) && answerIndexes.includes(index)
									? {
										p({ node, className, children, ...props }) {
											return (
												<p className={clsx(className, 'my-0! text-black dark:text-black')} {...props}>
													{children}
												</p>
											);
										},
										code({ className, children, ...props }) {
											return (
												<code className={clsx(className, 'text-black dark:text-black')} {...props}>
													{children}
												</code>
											);
										},
									}
									: checkedValues.includes(index)
										? {
											p({ node, className, children, ...props }) {
												return (
													<p className={clsx(className, 'my-0! text-black dark:text-black')} {...props}>
														{children}
													</p>
												);
											},
											code({ className, children, ...props }) {
												return (
													<code className={clsx(className, 'text-black dark:text-black')} {...props}>
														{children}
													</code>
												);
											},
										}
										: {
											p({ node, className, children, ...props }) {
												return (
													<p className={clsx(className, 'my-0! text-[var(--color-text)]')} {...props}>
														{children}
													</p>
												);
											},
											code({ className, children, ...props }) {
												return (
													<code className={clsx(className, 'text-[var(--color-text)]')} {...props}>
														{children}
													</code>
												);
											},
										}
							}
						>
							{option}
						</Markdown>
					</label>
				</li>
			))}
		</ul>
	);
};

export const AnswerOptions = React.memo(AnswerOptionsComponent);
