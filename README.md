# Agentic Blog Post Generation System

A sophisticated Python-based agentic workflow system that generates high-quality, SEO-optimized blog posts using Retrieval-Augmented Generation (RAG) with local Ollama models. The system analyzes your existing blog content, performs intelligent semantic search, and generates new articles that naturally complement your knowledge base.

## Features

- 🧠 **Multi-Agent Architecture**: Specialized agents for research, outlining, writing, editing, and SEO optimization
- 🔍 **Semantic Search**: Vector-based retrieval across your existing blog posts using ChromaDB
- 🤖 **Local LLM Integration**: Uses Ollama with GPT-OSS models for privacy and cost-efficiency
- 🎯 **SEO Optimization**: Built-in keyword analysis, meta description generation, and search optimization
- 📝 **Next.js Compatible**: Generates frontmatter and content compatible with Next.js blog structure
- ⚡ **Incremental Updates**: Smart ingestion that only processes changed or new posts
- 🎨 **Rich CLI**: Beautiful command-line interface with progress indicators and interactive modes

## Installation

### Prerequisites

1. **Python 3.8+**
2. **Ollama** with GPT-OSS model:
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh

   # Pull the model
   ollama pull gpt-oss:20b
   ```

### Quick Setup

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd danielkliewer.com
   pip install -r requirements.txt
   ```

2. **Ingest your existing blog posts:**
   ```bash
   python agent/cli.py ingest
   ```

3. **Generate your first blog post:**
   ```bash
   python agent/cli.py generate "Building AI-Powered Tools with Python" \
     --style technical \
     --length medium \
     --categories "AI & ML,Development" \
     --tags "Python,AI,Ollama" \
     --keywords "ai development,python automation"
   ```

## Usage

### Basic Commands

```bash
# Ingest/update knowledge base
python agent/cli.py ingest [--force] [--verbose]

# Generate a blog post
python agent/cli.py generate "Your Topic Here" [OPTIONS]

# Search knowledge base
python agent/cli.py search "query" [--top-k 5]

# View statistics
python agent/cli.py stats
```

### Generation Options

| Option | Description | Example |
|--------|-------------|---------|
| `--style` | Writing style | `technical`, `casual`, `professional` |
| `--length` | Content length | `short`, `medium`, `long` |
| `--categories` | Post categories | `"AI,Development"` |
| `--tags` | Post tags | `"Python,Ollama,RAG"` |
| `--keywords` | SEO keywords | `"ai automation,python tools"` |
| `--tone` | Content tone | `informative`, `persuasive`, `educational` |
| `--output` | Save to file | `--output content/blog/new-post.md` |
| `--dry-run` | Validate without generating | |
| `--interactive` | Interactive mode | |

### Example Commands

**Generate a technical tutorial:**
```bash
python agent/cli.py generate "Implementing RAG Systems with Local LLMs" \
  --style technical \
  --length long \
  --categories "AI & ML,Tutorials" \
  --tags "RAG,Ollama,LangChain" \
  --keywords "retrieval augmented generation,local llm,rag implementation"
```

**Generate a professional article:**
```bash
python agent/cli.py generate "The Future of AI in Software Development" \
  --style professional \
  --tone persuasive \
  --categories "AI & ML,Industry" \
  --keywords "ai software development,future tech"
```

**Interactive generation:**
```bash
python agent/cli.py generate "Machine Learning Best Practices" --interactive
```

## Architecture

### Core Components

- **Configuration System** (`agent/config.py`): Centralized settings using Pydantic
- **LLM Client** (`agent/llm_client.py`): Async interface to Ollama API
- **Vector Store** (`agent/vector_store.py`): ChromaDB-based document storage and retrieval
- **Ingestion Pipeline** (`agent/ingest.py`): Content processing and vectorization
- **Semantic Retrieval** (`agent/retrieval.py`): RAG query expansion and context assembly
- **Multi-Agent System** (`agent/agents/`): Specialized agents for content creation

### Agent Pipeline

1. **Researcher Agent**: Analyzes knowledge base, extracts themes, identifies gaps
2. **Outliner Agent**: Creates SEO-optimized content structure
3. **Writer Agent**: Generates main article content
4. **Editor Agent**: Polishes and refines content
5. **SEO Optimizer**: Final optimization for search visibility

### Data Flow

```
Existing Blog Posts → Ingestion → Vector Database
                                        ↓
User Topic Request → Research Agent → Context Gathering
                                        ↓
Outline Agent → Content Structure → Writing Agent
                                        ↓
Editor Agent → SEO Agent → Final Blog Post
```

## Configuration

The system uses environment variables for configuration. Create a `.env` file in the project root:

```env
# Ollama settings
AGENT_OLLAMA_MODEL=gpt-oss:20b
AGENT_OLLAMA_BASE_URL=http://localhost:11434

# Vector DB settings
AGENT_COLLECTION_NAME=blog_knowledge_base
AGENT_VECTOR_DB_PROVIDER=chromadb

# Generation settings
AGENT_MIN_WORD_COUNT=800
AGENT_MAX_WORD_COUNT=2000
AGENT_TEMPERATURE=0.7
```

## Output Format

Generated posts are compatible with Next.js and include proper frontmatter:

```markdown
---
layout: post
title: "Generated Title Here"
date: 2025-10-07 10:30:00 -0500
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2", "tag3"]
excerpt: "150-200 character SEO description"
slug: "url-safe-slug"
---

# Article Content

Your generated blog post content here...
```

## Troubleshooting

### Common Issues

**"Model not found" error:**
```bash
ollama pull gpt-oss:20b
```

**"No markdown files found":**
- Ensure you're in the project root directory
- Check that `content/blog/` contains `.md` files
- Verify file permissions

**"Connection refused" to Ollama:**
```bash
# Start Ollama service
ollama serve
```

**Slow ingestion:**
- Use `--force` only when necessary
- The system performs incremental updates by default
- Consider reducing chunk size in configuration

### Logs and Debugging

Enable verbose logging:
```bash
python agent/cli.py --verbose COMMAND
```

Check logs in `.agent_data/logs/agent.log`

## Development

### Project Structure

```
danielkliewer.com/
├── agent/                          # Main package
│   ├── __init__.py                # Package initialization
│   ├── cli.py                     # Command-line interface
│   ├── config.py                  # Configuration management
│   ├── ingest.py                  # Knowledge base ingestion
│   ├── retrieval.py               # Semantic search system
│   ├── llm_client.py              # Ollama API client
│   ├── vector_store.py            # Vector database operations
│   ├── models.py                  # Pydantic data models
│   ├── agents/                    # Agent implementations
│   │   ├── researcher.py          # Research agent
│   │   └── ...                    # Other agents
│   ├── prompts/                   # Prompt templates
│   │   ├── system_prompts.py      # Agent system prompts
│   │   └── templates.py           # Dynamic prompt templates
│   └── utils/                     # Utility functions
│       ├── parser.py              # Markdown/frontmatter parsing
│       ├── validator.py           # Content validation
│       └── file_utils.py          # File I/O operations
├── .agent_data/                   # Data and logs
│   ├── vector_db/                 # ChromaDB storage
│   ├── cache/                     # Caching directory
│   └── logs/                      # Log files
├── content/blog/                  # Blog posts (input/output)
├── requirements.txt               # Python dependencies
├── setup.py                       # Package setup
└── README.md                      # This file
```

### Testing

```bash
# Install development dependencies
pip install pytest pytest-asyncio

# Run tests
pytest

# Run specific tests
pytest tests/test_agent.py
```

### Extending the System

**Add a new agent:**
```python
from agent.models import BaseAgent

class CustomAgent(BaseAgent):
    def __init__(self):
        super().__init__("custom_agent")
        self.system_prompt = "Your system prompt here"

    async def process(self, input_data):
        # Your agent logic here
        return processed_data
```

**Add custom prompt templates:**
```python
# In agent/prompts/templates.py
CUSTOM_TEMPLATE = Template("""
Custom prompt with $variable
""")
```

## Performance

- **Ingestion**: ~50-100 posts per minute (depends on content length)
- **Search**: <100ms typical response time
- **Generation**: ~2-5 minutes per post (depending on length)
- **Storage**: ~1GB per 1000 posts (with embeddings)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Roadmap

- [ ] Complete multi-agent implementation (Writer, Editor, SEO agents)
- [ ] Interactive web interface
- [ ] Support for additional vector databases (Qdrant, Pinecone)
- [ ] Custom model training on blog style
- [ ] Automated publishing workflows
- [ ] Multi-language support
- [ ] Advanced SEO analytics integration

---

Built with ❤️ for the AI-powered content creation future.
