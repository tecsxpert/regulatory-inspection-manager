import chromadb
import logging

logger = logging.getLogger(__name__)

chroma_client = None
knowledge_collection = None

def initialize_chromadb():
    global chroma_client, knowledge_collection
    try:
        chroma_client = chromadb.PersistentClient(path="./chroma_data")
        knowledge_collection = chroma_client.get_or_create_collection(
            name="inspection_knowledge"
        )
        logger.info("ChromaDB initialized successfully")
        seed_knowledge_documents()
    except Exception as e:
        logger.error(f"ChromaDB initialization failed: {e}")

def seed_knowledge_documents():
    global knowledge_collection
    if knowledge_collection is None:
        return

    if knowledge_collection.count() > 0:
        logger.info("ChromaDB already seeded — skipping")
        return

    documents = [
        "Food safety inspections check for proper food storage temperatures, expiry dates, hygiene practices, and pest control measures in food service establishments.",
        "Fire safety inspections verify that fire extinguishers are charged and accessible, emergency exits are unobstructed, fire alarms are functional, and sprinkler systems are operational.",
        "Environmental compliance inspections assess waste water discharge levels, chemical storage practices, air quality standards, and secondary containment for hazardous materials.",
        "Building safety inspections examine structural integrity, elevator certifications, electrical systems, plumbing conditions, and compliance with building codes.",
        "Health and safety workplace inspections cover personal protective equipment usage, machinery guarding, ergonomic hazards, first aid provisions, and incident reporting procedures.",
        "Regulatory compliance requires all inspected facilities to maintain up-to-date documentation including licenses, certifications, training records, and maintenance logs.",
        "High risk findings in inspections include immediate threats to life safety such as blocked emergency exits, non-functional fire suppression systems, and structural instability.",
        "Medium risk findings include issues that could escalate to serious harm if not addressed within a reasonable timeframe such as expired safety equipment and missing safety signage.",
        "Low risk findings are minor violations that do not pose immediate danger but require correction to maintain full regulatory compliance.",
        "Best practices for regulatory compliance include conducting regular internal audits, maintaining comprehensive records, training staff on safety procedures, and implementing corrective action plans."
    ]

    ids = [f"doc_{i}" for i in range(len(documents))]

    knowledge_collection.add(
        documents=documents,
        ids=ids
    )
    logger.info(f"Seeded ChromaDB with {len(documents)} knowledge documents")

def query_knowledge(query_text: str, n_results: int = 3):
    global knowledge_collection
    if knowledge_collection is None:
        return []
    try:
        results = knowledge_collection.query(
            query_texts=[query_text],
            n_results=n_results
        )
        return results['documents'][0] if results['documents'] else []
    except Exception as e:
        logger.error(f"ChromaDB query failed: {e}")
        return []