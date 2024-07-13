import React, { useState, useEffect } from "react";
import "../css/components.css";
import { useEmpleado } from "../context/empleadoContext";
import { useContrato } from "../context/contratoContext";
import { useDetalle } from "../context/detalleLiquidacionContext";
import { Toaster, toast } from "react-hot-toast";
import { format } from "date-fns";

const RegistroLiquidacionForm = ({ onClose, empleadoToEdit, cargos }) => {
    const [formData, setFormData] = useState({
        idEmpleado: "",
        diasTrabajados: "",
        horasExtras: ""
    });
    const tcontratos = [
        "TERMINO INDEFINIDO",
        "TERMINO FIJO",
        "PERSTACION DE SERVICIOS"
    ];
    const [error, setError] = useState("");
    const { createDetalle } = useDetalle();
    const { getEmpleado } = useEmpleado();
    const { getContrato } = useContrato();

    useEffect(() => {
        if (empleadoToEdit) {
            const contrato = empleadoToEdit.contrato || {};
            setFormData({
                idEmpleado: empleadoToEdit.idEmpleado,
                diasTrabajados: "",
                horasExtras: ""
            });
        }
    }, [empleadoToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        getEmpleado();
        getContrato();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDetalle(formData);
            toast.success(<b>La liquidación ha sido registrada correctamente.</b>);
            onClose();
        } catch (error) {
            setError(error.message);
            toast.error(<b>Error: {error.message}</b>);
        }
    };

    return (
        <div className="w-full h-full">
            <Toaster />
            <div className="form-comp">
                <div className="header-comp">
                    <h1 className="title-comp">{empleadoToEdit ? "Liquidar Empleado" : "Registrar Empleado"}</h1>
                </div>
                <div className="card-grid card-centered">
                    <h1 className="sub-titles-copm">Empleado</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid-container">
                            <div className="input-container">
                                <input
                                    type="number"
                                    id="idEmpleado"
                                    name="idEmpleado"
                                    value={formData.idEmpleado}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                    readOnly
                                />
                                <label htmlFor="documento">Documento</label>
                            </div>
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
                                    readOnly
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
                                    readOnly

                                />
                                <label htmlFor="nombre">Nombre</label>
                            </div>
                            <select
                                id="idCargo"
                                name="idCargo"
                                value={formData.idCargo}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                readOnly

                            >
                                <option value="">Seleccionar Cargo</option>
                                {cargos.map((c) => (
                                    <option key={c.idCargo} value={c.idCargo}>
                                        {c.nCargo}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                id="fechaInicio"
                                name="fechaInicio"
                                value={formData.fechaInicio}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                autoComplete="off"
                                readOnly

                            />

                            <input
                                type="date"
                                id="fechaFin"
                                name="fechaFin"
                                value={formData.fechaFin}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                autoComplete="off"
                                readOnly

                            />

                            <div className="input-container">
                                <input
                                    type="number"
                                    id="salario"
                                    name="salario"
                                    value={formData.salario}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                    readOnly

                                />
                                <label htmlFor="salario">Salario</label>
                            </div>
                            <select
                                id="tipoContrato"
                                name="tipoContrato"
                                value={formData.tipoContrato}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                readOnly

                            >
                                <option value="">
                                    Seleccionar Contrato
                                </option>
                                {tcontratos.map((modulo, index) => (
                                    <option key={index} value={modulo}>
                                        {modulo}
                                    </option>
                                ))}
                            </select>

                            <div className="input-container">
                                <input
                                    type="number"
                                    id="diasTrabajados"
                                    name="diasTrabajados"
                                    value={formData.diasTrabajados}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label htmlFor="diasTrabajados">Días Trabajados</label>
                            </div>
                            <div className="input-container">
                                <input
                                    type="number"
                                    id="horasExtras"
                                    name="horasExtras"
                                    value={formData.horasExtras}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    autoComplete="off"
                                />
                                <label htmlFor="horasExtras">Horas Extras</label>
                            </div>
                        </div>
                        <button type={empleadoToEdit ? "submit_2" : "submit_2"}>
                            {empleadoToEdit ? "Liquidar" : "Registrar"}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistroLiquidacionForm;
