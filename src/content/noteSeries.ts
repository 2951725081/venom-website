export type NoteSeries = {
	slug: string;
	title: string;
	description: string;
};

const series = {
	cs61a: {
		slug: 'cs61a',
		title: 'CS61A',
		description: 'Python、函数式编程与计算机科学基础课程笔记。',
	},
	cs231n: {
		slug: 'cs231n',
		title: 'CS231n',
		description: '计算机视觉课程中关于图像分类、卷积网络和反向传播的整理。',
	},
	d2l: {
		slug: 'd2l',
		title: '动手学深度学习',
		description: '跟随《动手学深度学习》的阅读、实践与待补充记录。',
	},
	deepLearning: {
		slug: 'deep-learning',
		title: '深度学习基础',
		description: '神经网络、训练稳定性、Keras 与学习路线等基础主题。',
	},
	technical: {
		slug: 'technical',
		title: '技术杂谈',
		description: '不属于单一课程的工具、编程和机器学习零散记录。',
	},
} satisfies Record<string, NoteSeries>;

export function getNoteSeries(id: string): NoteSeries {
	const filename = id.split('/').pop() ?? id;
	if (filename === 'cs61a') return series.cs61a;
	if (filename.startsWith('dl-cs231n-')) return series.cs231n;
	if (filename.startsWith('dl-d2l-')) return series.d2l;
	if (filename === 'dl-30-day-deep-learning-plan-general' || filename === 'dl-deep-learning-roadmap' || filename === 'dl-d1-neural-networks') return series.deepLearning;
	return series.technical;
}

export const noteSeries = Object.values(series);
