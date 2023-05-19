import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { groq } from '@ai-sdk/groq';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': groq('llama-3.3-70b-versatile'),
        'chat-model-reasoning': wrapLanguageModel({
          model: groq('qwen/qwen3-32b'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': groq('llama-3.3-70b-versatile'),
        'artifact-model': groq('llama-3.3-70b-versatile'),
      },
      // imageModels: {
      //   'small-model': groq.imageModel(
      //     'meta-llama/llama-4-scout-17b-16e-instruct',
      //   ),
      // },
    });
