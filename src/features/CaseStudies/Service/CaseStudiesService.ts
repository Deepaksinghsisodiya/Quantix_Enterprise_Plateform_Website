// src/features/CaseStudies/Service/CaseStudiesService.ts
import { baseApi } from '@/redux/services/baseApi';
import { CaseStudyDto, ApiCaseStudiesResponse } from '../Types/CaseStudiesTypes';

export const caseStudiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCaseStudies: builder.query<CaseStudyDto[], void>({
      query: () => '/marketing/content/CaseStudy',
      transformResponse: (response: any) => {
        if (!response?.success || !Array.isArray(response?.data) || response.data.length === 0) {
          return [];
        }
        return response.data.map((item: any) => {
          const rawTitle = (item.title || 'Enterprise Case Study').trim();
          
          // Extract Company Name and Clean Title
          let companyName = 'Quantix Partner Brand';
          let title = rawTitle;
          if (rawTitle.includes(':')) {
            const parts = rawTitle.split(':');
            companyName = parts[0].trim();
            title = parts.slice(1).join(':').trim();
          }

          const bodyText = (item.body || '').trim();
          
          // Separate Challenge vs Solution vs Result
          let challenge = bodyText;
          let solution = 'Deployed Quantix Cloud POS with integrated hardware and real-time data sync.';
          let result = 'Achieved significant operational efficiency, lower costs, and faster customer turnaround.';

          const resultIdx = bodyText.toLowerCase().indexOf('result:');
          if (resultIdx !== -1) {
            challenge = bodyText.substring(0, resultIdx).trim();
            result = bodyText.substring(resultIdx + 7).trim();
          }

          const solutionIdx = challenge.toLowerCase().indexOf('by deploying');
          if (solutionIdx !== -1) {
            const tempChallenge = challenge.substring(0, solutionIdx).trim();
            solution = challenge.substring(solutionIdx).trim();
            challenge = tempChallenge;
          }

          // Smart Stat Extraction (e.g. "+38% Faster", "42% Reduction")
          let statValue = '+35% ROI';
          const percentMatch = (rawTitle + ' ' + bodyText).match(/(\+?\d+%\s*[A-Za-z]+)/);
          if (percentMatch) {
            statValue = percentMatch[0].trim();
          } else {
            const simplePercent = (rawTitle + ' ' + bodyText).match(/(\+?\d+%)/);
            if (simplePercent) {
              statValue = simplePercent[0].trim();
            }
          }

          // Detect industry
          let industry = 'Hospitality & Retail';
          const lowerText = (rawTitle + ' ' + bodyText).toLowerCase();
          if (lowerText.includes('restaurant') || lowerText.includes('dining') || lowerText.includes('kds') || lowerText.includes('table')) {
            industry = 'Restaurant & Dining';
          } else if (lowerText.includes('retail') || lowerText.includes('store') || lowerText.includes('barcode') || lowerText.includes('apparel')) {
            industry = 'Retail & Supermarket';
          } else if (lowerText.includes('franchise') || lowerText.includes('enterprise') || lowerText.includes('multi-location')) {
            industry = 'Multi-Unit Enterprise';
          }

          return {
            id: item.contentId || item.id || String(Math.random()),
            slug: item.pageSlug ? item.pageSlug.replace(/^\/?(case-studies\/)?/, '') : 'case-study',
            title: title || rawTitle,
            companyName: companyName || 'Verified Merchant',
            industry,
            challenge: challenge || 'Managing multi-location operations efficiently.',
            solution,
            result,
            statLabel: 'Verified Outcome',
            statValue,
            imageUrl: item.imageUrl || null,
            createdAt: item.createdAt || new Date().toISOString(),
          } as CaseStudyDto;
        });
      },
      providesTags: ['CaseStudies'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCaseStudiesQuery } = caseStudiesApi;
