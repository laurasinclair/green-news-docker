/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,  // <- ignores warnings from node_modules
			},
		},
    },
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			api: path.resolve(__dirname, "./src/api/"),
			assets: `${path.resolve(__dirname, "./src/assets")}`,
			components: `${path.resolve(__dirname, "./src/components")}`,
			config: `${path.resolve(__dirname, "./src/config")}`,
			context: `${path.resolve(__dirname, "./src/context")}`,
			hooks: `${path.resolve(__dirname, "./src/hooks")}`,
			images: `${path.resolve(__dirname, "./src/assets/images")}`,
			pages: path.resolve(__dirname, "./src/pages"),
			router: path.resolve(__dirname, "./src/router"),
			src: path.resolve(__dirname, "./src"),
			types: path.resolve(__dirname, "./src/types"),
			utils: path.resolve(__dirname, "./src/utils"),
		},
	},
	build: {
		cssCodeSplit: false,
		cssMinify: "esbuild",
		minify: "esbuild",
		sourcemap: true,
	},
});
