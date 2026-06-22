#!/usr/bin/env python3
"""
manage_files.py
Ensures cv.pdf exists and certificates are placed in ./certs/
"""

import shutil
from pathlib import Path
from typing import Tuple, List

# Path.home() automatically finds the current user's home directory
DOWNLOADS_DIR = Path.home() / "Downloads"

# Map uploaded source -> target filename
SOURCE_TO_TARGET = {
    "4c28bef3-28b2-4209-b7c7-04f8d24220c6.pdf": "certificate1.pdf",  # Networking Basics
    "7ffb3b55-9e78-4888-ab95-98243c4e1d0e.pdf": "certificate2.pdf",  # IoT & Digital Transformation
    "470a25e2-5981-47ec-ae04-50a23bf1f58a.pdf": "certificate3.pdf",  # Ethical Hacker
    str(DOWNLOADS_DIR / "cert.pdf"): "certificate4.pdf",             # Intro to Cybersecurity
}

# The new resume is placed at the top of the list so it is always detected
POSSIBLE_CV_NAMES = [
    "Blue and White Modern Professional Resume.pdf",
    "Aaryan_Bastola_Resume.pdf", "Aaryan_Bastola_CV.pdf",
    "resume.pdf", "CV.pdf", "aaryan_cv.pdf", "aaryan_resume.pdf"
]

def ensure_cv_exists() -> bool:
    """Checks for an existing CV or copies one from the list of possible names."""
    cv_path = Path("cv.pdf")
    
    if cv_path.exists():
        print("✅ cv.pdf already exists.")
        return True

    for name in POSSIBLE_CV_NAMES:
        source_path = Path(name)
        if source_path.exists():
            try:
                shutil.copy2(source_path, cv_path)
                print(f"✅ Copied {name} ➜ cv.pdf")
                return True
            except Exception as e:
                print(f"❌ Failed to copy {name}: {e}")

    print("⚠️ cv.pdf not found.")
    return False

def ensure_certs() -> Tuple[List[str], List[str]]:
    """Ensures certificates are present in the certs/ directory."""
    certs_dir = Path("certs")
    certs_dir.mkdir(exist_ok=True)
    
    moved = []
    missing = []

    for src, target in SOURCE_TO_TARGET.items():
        src_path = Path(src)
        dst_path = certs_dir / target

        # Check if it's already in the target folder to avoid unnecessary copying
        if dst_path.exists():
            print(f"✅ {target} already exists in certs/.")
            moved.append(target)
            continue

        if src_path.exists():
            try:
                shutil.copy2(src_path, dst_path)
                print(f"✅ {src_path.name} ➜ {dst_path}")
                moved.append(target)
            except Exception as e:
                print(f"❌ Error copying {src_path.name}: {e}")
                missing.append(src)
        else:
            missing.append(src)

    return moved, missing

if __name__ == "__main__":
    print("→ Managing files...")
    ensure_cv_exists()
    moved, missing = ensure_certs()

    print("\n--- Summary ---")
    if moved:
        print("Placed:\n - " + "\n - ".join(moved))
    if missing:
        print("Missing:\n - " + "\n - ".join(missing))
