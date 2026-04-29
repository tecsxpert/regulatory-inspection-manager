from sentence_transformers import SentenceTransformer
import logging

logger = logging.getLogger(__name__)

embedding_model = None

def load_embedding_model():
    global embedding_model
    try:
        logger.info("Loading sentence-transformers model...")
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        logger.info("Sentence-transformers model loaded successfully")
    except Exception as e:
        logger.error(f"Failed to load embedding model: {e}")
        embedding_model = None

def get_embedding(text: str):
    if embedding_model is None:
        return None
    try:
        return embedding_model.encode(text).tolist()
    except Exception as e:
        logger.error(f"Embedding failed: {e}")
        return None