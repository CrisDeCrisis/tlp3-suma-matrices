from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Matrices(BaseModel):
    matriz1: List[List[float]]
    matriz2: List[List[float]]

@app.post("/sumar-matrices")
async def sumar_matrices(matrices: Matrices):
    matriz1 = matrices.matriz1
    matriz2 = matrices.matriz2

    # Validar que las matrices tengan las mismas dimensiones
    if len(matriz1) != len(matriz2) or len(matriz1[0]) != len(matriz2[0]):
        raise HTTPException(status_code=400, detail="Las matrices deben tener las mismas dimensiones")

    # Sumar las matrices
    resultado = [
        [matriz1[i][j] + matriz2[i][j] for j in range(len(matriz1[i]))]
        for i in range(len(matriz1))
    ]

    return {"resultado": resultado}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)