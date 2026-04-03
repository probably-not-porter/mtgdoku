import sqlite3
import random as rand
import os

DB_PATH = "mtg_relational_grids.db"
_conn = None

def get_connection():
    global _conn
    if _conn is None:
        _conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        # Performance tuning for large databases
        _conn.execute("PRAGMA journal_mode = WAL;") 
        _conn.execute("PRAGMA synchronous = NORMAL;")
        _conn.execute("PRAGMA cache_size = -100000;") # Uses ~100MB of RAM for cache
    return _conn

def get_labels_batch(conn, indices):
    """Fetches all labels in a single query instead of one-by-one."""
    placeholders = ','.join(['?'] * len(indices))
    query = f"SELECT id, cat, value FROM categories WHERE id IN ({placeholders})"
    res = conn.execute(query, indices).fetchall()
    
    # Map by ID to maintain the original requested order
    lookup = {row[0]: {"cat": row[1], "value": row[2]} for row in res}
    return [lookup.get(i) for i in indices]

def get_random_board():
    conn = get_connection()
    
    # 1. Use rowid - SQLite's built-in fast index
    # Note: MAX(rowid) is near-instant even on 10GB files
    max_row = conn.execute("SELECT MAX(rowid) FROM compatible_pairs").fetchone()[0]
    
    if not max_row:
        return None

    random_target = rand.randint(1, max_row)
    
    # Use 'rowid' in the WHERE clause for O(1) lookup speed
    pair = conn.execute(
        "SELECT row_trio_id, col_trio_id FROM compatible_pairs WHERE rowid >= ? LIMIT 1", 
        (random_target,)
    ).fetchone()
    
    r_id, c_id = pair
    
    # 2. Batch fetch trios
    trio_data = conn.execute(
        "SELECT id, c1_idx, c2_idx, c3_idx FROM trios WHERE id IN (?, ?)", 
        (r_id, c_id)
    ).fetchall()
    
    trios = {row[0]: row[1:] for row in trio_data}
    r_cats, c_cats = trios[r_id], trios[c_id]
    
    # 3. Batch fetch labels
    all_indices = list(r_cats) + list(c_cats)
    all_labels = get_labels_batch(conn, all_indices)
    
    return {
        "rows": all_labels[:3],
        "cols": all_labels[3:]
    }

def get_seeded_board(seed_value):
    conn = get_connection()
    rand.seed(seed_value)
    
    # Get the max rowid
    max_row = conn.execute("SELECT MAX(rowid) FROM compatible_pairs").fetchone()[0]
    
    if not max_row:
        return None

    # Deterministic target based on seed
    target_row = rand.randint(1, max_row)
    
    # Use rowid for speed
    pair = conn.execute(
        "SELECT row_trio_id, col_trio_id FROM compatible_pairs WHERE rowid >= ? LIMIT 1", 
        (target_row,)
    ).fetchone()
    
    r_id, c_id = pair
    
    # Batch fetch trio connections
    trio_data = conn.execute(
        "SELECT id, c1_idx, c2_idx, c3_idx FROM trios WHERE id IN (?, ?)", 
        (r_id, c_id)
    ).fetchall()
    
    trios = {row[0]: row[1:] for row in trio_data}
    r_cats, c_cats = trios[r_id], trios[c_id]
    
    # Batch fetch actual category labels
    all_indices = list(r_cats) + list(c_cats)
    all_labels = get_labels_batch(conn, all_indices)
    
    return {
        "seed": seed_value,
        "rows": all_labels[:3],
        "cols": all_labels[3:]
    }