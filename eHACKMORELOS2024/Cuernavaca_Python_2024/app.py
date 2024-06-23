import tkinter as tk
import json

# Función para leer un archivo JSON
def leer_json(nombre_archivo):
    try:
        with open(nombre_archivo, 'r') as archivo:
            datos = json.load(archivo)
            return datos
    except FileNotFoundError:
        print(f"El archivo '{nombre_archivo}' no fue encontrado.")
        return None
    except json.JSONDecodeError:
        print(f"No se pudo decodificar el archivo '{nombre_archivo}'. Asegúrate de que sea un archivo JSON válido.")
        return None

# Crear ventana principal
window = tk.Tk()
window.title("Sistema de Tickets")
window.geometry("400x300")

# Leer archivo JSON
nombre_archivo = "data_json.json"  # Aquí se reemplaza el nombre del archivo directamente
datos = leer_json(nombre_archivo)

# Función para mostrar los datos en la interfaz
def mostrar_tickets():
    if datos:
        for ticket in datos['tickets']:
            tk.Label(window, text=f"ID: {ticket['id']}, Asunto: {ticket['asunto']}, Estado: {ticket['estado']}").pack()

# Botón para mostrar los tickets
button = tk.Button(window, text="Mostrar Tickets", command=mostrar_tickets)
button.pack()

# Ejecutar el bucle principal de la interfaz
tk.mainloop()
