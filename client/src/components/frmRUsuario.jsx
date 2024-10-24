import React, { useState, useEffect } from "react";
import "../css/components.css";
import { useRol } from "../context/rolContext";
import { useUsuario } from "../context/usuarioContext";
import { Toaster, toast } from "react-hot-toast";

const RegistroUsuarioForm = ({ onClose, usuarioToEdit, roles }) => {
    const [formData, setFormData] = useState({
        documento: "",
        nombre: "",
        correo: "",
        contraseña: "",
        idRol: "",
    });
    const [newRol, setNewRol] = useState({
        nRol: ""
    });
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const { createUsuario, updateUsuario, getUsuario } = useUsuario();
    const {
        createRol,
        getRol,
    } = useRol();

    useEffect(() => {
        if (usuarioToEdit) {
            setFormData({
                documento: usuarioToEdit.documento,
                nombre: usuarioToEdit.nombre,
                correo: usuarioToEdit.correo,
                contraseña: "",
                idRol: usuarioToEdit.idRol,
            });
        }
    }, [usuarioToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuarioToEdit) {
                const updatedData = { ...formData };

                // Si el usuario no ha cambiado la contraseña, no enviar el campo de contraseña
                if (formData.contraseña === "") {
                    delete updatedData.contraseña;
                }

                await updateUsuario(usuarioToEdit.idUsuario, formData);
                toast.success(<b>El usuario fue actualizado con éxito!</b>);
            } else {
                await createUsuario(formData);
                toast.success(<b>El usuario ha sido registrado correctamente.</b>);
            }
            await getUsuario();
            onClose();
        } catch (error) {
            setError(error.response.data.message);
            toast.error(`Error: ${error.response.data.message}`);
        }
    };

    const handleCreateRol = async (e) => {
        e.preventDefault();
        try {
            await createRol(newRol);
            toast.success(<b>El rol ha sido registrado correctamente.</b>);
            setNewRol({
                nRol: ""
            });
            setIsModalOpen(false);
            await getRol();
        } catch (error) {
            setError(error.response?.data?.message || "Error desconocido");
            toast.error(<b>Error: {error.response?.data?.message || "Error desconocido"}</b>);
        }
    };

    const handleNewRolChange = (e) => {
        const { name, value } = e.target;
        setNewRol((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCloseModal = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
            setIsModalOpen(false)
        }, 500);
    };

    return (
        <div className="w-full h-full">
            <Toaster />
            <div className="form-comp">
                <div className="header-comp">
                    <h1 className="title-comp">{usuarioToEdit ? "Actualizar Usuario" : "Registrar Usuario"}</h1>
                </div>
                <div className="card-grid card-centered">
                    <h1 className="sub-titles-copm">Nuevo Usuario</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid-container">
                            <div className="input-container">
                                <input
                                    type="number"
                                    id="documento"
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label htmlFor="documento">Documento</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label htmlFor="nombre">Nombre</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label htmlFor="correo">Correo</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="contraseña"
                                    name="contraseña"
                                    value={formData.contraseña}
                                    onChange={handleChange}
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label htmlFor="contraseña">Contraseña</label>
                            </div>
                            <div>
                                <select
                                    id="idRol"
                                    name="idRol"
                                    value={formData.idRol}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                >
                                    <option value="">Seleccionar Rol</option>
                                    {roles.map((rol) => (
                                        <option key={rol.idRol} value={rol.idRol}>
                                            {rol.nRol}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="button_3" className="open-modal-button-3" onClick={() => setIsModalOpen(true)}>
                                    <i className="fi fi-br-plus-small icon-style-modal-2"></i>
                            </button>
                        </div>
                        <button type={usuarioToEdit ? "submit_2" : "submit_2"}>
                            {usuarioToEdit ? "Actualizar" : "Registrar"}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
            {isModalOpen && (
                <div className={`modal-overlay ${isExiting ? "hidden" : "visible"}`} onClick={handleCloseModal}>
                    <div className={`modal-content-2 ${isExiting ? "hidden" : ""}`} onClick={(e) => e.stopPropagation()}>
                        <h2>Agregar Nuevo Rol</h2>
                        <div className="card-modal">
                            <form onSubmit={handleCreateRol}>
                                <div className="form-group">
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            id="nRol"
                                            name="nRol"
                                            placeholder=" "
                                            autoComplete="off"
                                            value={newRol.nRol}
                                            onChange={handleNewRolChange}
                                            required
                                        />
                                        <label htmlFor="nRol">Nombre de rol</label>
                                    </div>
                                    <button type="submit">Guardar</button>
                                    <button type="button" onClick={handleCloseModal}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistroUsuarioForm;
