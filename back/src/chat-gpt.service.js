import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI secrets are required as environment variables');
  process.exit(1);
}

export class ChatGptService {
  constructor() {
    this.api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async sendMessage(message, context, contextType) {
    const temperatureThreashold = 0.7;

    const response = await this.api.chat.completions.create({
      messages: [
        { role: 'system', content: this._generateContext(contextType, context) },
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
      temperature: temperatureThreashold,
    });

    const bealtifiedErrorMessage =
      'Ops, não consegui obter uma resposta para você. Pergunte algo diferente ou tente novamente mais tarde';

    return response.choices[0] ? response.choices[0].message.content : bealtifiedErrorMessage;
  }

  _generateContext(type, context) {
    switch (type) {
      case 'vacancy':
        return `
          Você é um assistente virtual para a área de recursos humanos 
          e sua tarefa será analisar a descrição de uma vaga de emprego 
          e auxiliar um recrutador a conseguir extrair o máximo de informação 
          sobre um ou mais candidatos para essa vaga.
          A vaga é a seguinte: 
          Cargo: ${context.role}
          Descrição: ${context.description}
          Valores da Empresa: ${context.values || 'Não informado'}
          A resposta deve ser dada em formato de texto em português brasiliero.
        `;
      case 'resume':
        // TODO - validar se iremos fazer essa parte
        return 'Aqui vai o prompt para currículos';
      default:
        return '';
    }
  }
}