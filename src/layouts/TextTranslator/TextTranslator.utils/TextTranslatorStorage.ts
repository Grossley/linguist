import { TypeOf } from 'io-ts';
import { browser } from 'webextension-polyfill-ts';

import { tryDecode, type } from '../../../lib/types';
import { LangCodeWithAuto, LangCode } from '../../../types/runtime';
import { AbstractVersionedStorage } from '../../../types/utils';

export class TextTranslatorStorage extends AbstractVersionedStorage {
	static publicName = 'TextTranslatorStorage';
	static storageVersion = 2;

	public static readonly storeName = 'TextTranslatorStorage';
	public static readonly storageSignature = type.union([
		type.type({
			from: LangCodeWithAuto,
			to: LangCode,
			translate: type.union([
				type.type({
					text: type.string,
					translate: type.union([type.string, type.null]),
				}),
				type.null,
			]),
		}),
		type.null,
	]);

	/**
	 * Default data
	 */
	public static readonly defaultData: TypeOf<
		typeof TextTranslatorStorage.storageSignature
	> = null;

	public static getData = async () => {
		const storeName = TextTranslatorStorage.storeName;
		const { [storeName]: tabData } = await browser.storage.local.get(storeName);

		const { defaultData } = TextTranslatorStorage;
		if (tabData !== undefined) {
			return tryDecode(
				TextTranslatorStorage.storageSignature,
				tabData,
				defaultData,
			);
		} else {
			return defaultData;
		}
	};

	public static setData = async (
		data: TypeOf<typeof TextTranslatorStorage.storageSignature>,
	) => {
		// Verify data
		tryDecode(TextTranslatorStorage.storageSignature, data);

		const storeName = TextTranslatorStorage.storeName;
		await browser.storage.local.set({ [storeName]: data });
	};

	public static updateData = async (
		data: Partial<TypeOf<typeof TextTranslatorStorage.storageSignature>>,
	) => {
		const actualData = await TextTranslatorStorage.getData();

		// Protect from null
		if (typeof actualData === null) {
			throw new TypeError('Cant merge with null');
		}

		const mergedData = Object.assign(actualData, data);

		return TextTranslatorStorage.setData(mergedData);
	};

	public static clear = async () => TextTranslatorStorage.setData(null);

	public static forgetText = async () => {
		const data = await TextTranslatorStorage.getData();

		if (data !== null) {
			data.translate = null;
			TextTranslatorStorage.setData(data);
		}
	};

	public static async updateStorageVersion() {
		const lastState = localStorage.getItem('TextTranslator.lastState');

		// Skip
		if (lastState === null) return;

		// Try decode and set data
		try {
			const decodedData = JSON.parse(lastState);
			await TextTranslatorStorage.setData(decodedData);
		} catch (error) {
			// Do nothing, because invalid data here it is not our responsibility domain
		}

		// Clear data
		localStorage.removeItem('TextTranslator.lastState');
	}
}
