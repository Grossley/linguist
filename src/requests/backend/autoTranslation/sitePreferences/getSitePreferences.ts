import { buildBackendRequest } from '../../../../lib/requests/requestBuilder';
import { type } from '../../../../lib/types';

import { getPreferences, dataSignature } from './utils';

export const [getSitePreferencesFactory, getSitePreferencesReq] = buildBackendRequest(
	'getSitePreferences',
	{
		requestValidator: type.string,
		responseValidator: type.union([dataSignature, type.null]),

		factoryHandler: () => getPreferences,
	},
);

export const getSitePreferences = (site: string) => getSitePreferencesReq(site);
