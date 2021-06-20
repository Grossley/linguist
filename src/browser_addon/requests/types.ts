// NOTE: probably should make factory builder which control update props and rebuild factories which require changed props

import { TranslatorClass } from '../types/objects';

import { Background } from '../modules/Background';
import { ConfigStorage } from '../modules/ConfigStorage/ConfigStorage';

import { AppConfigType } from '../types/runtime';

import { PageTranslator } from '../modules/PageTranslator/PageTranslator';
import { SelectTranslator } from '../modules/SelectTranslator';

export type RequestHandlerFactoryProps = {
	cfg: ConfigStorage<any>;
	bg: Background<any>;
	translatorModules: Record<string, TranslatorClass>;
};

export type RequestHandlerFactory = (props: RequestHandlerFactoryProps) => void;

export type ClientRequestHandlerFactoryProps = {
	pageTranslator: PageTranslator;
	selectTranslatorRef: { value: SelectTranslator | null };
	config: AppConfigType;
};

export type ClientRequestHandlerFactory = (
	props: ClientRequestHandlerFactoryProps,
) => void;
