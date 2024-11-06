import { sveltePreprocess } from 'svelte-preprocess';

const config = {
	preprocess: sveltePreprocess({
		scss: {
			prependData: '@use "src/styles/variables.scss";'
		},
		typescript: {
			transpileOnly: true // Om du vill använda TypeScript utan att det stoppas av typkontroller
		}
	})
};

export default config;
