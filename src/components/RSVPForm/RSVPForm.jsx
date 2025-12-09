import React, { useState } from "react";
import styles from "./RSVPForm.module.css";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { InputText } from "primereact/inputtext";

function RSVPForm() {
  const [names, setNames] = useState([""]); // Array to hold guest names
  const [attending, setAttending] = useState("");
  const [message, setMessage] = useState("");
  const [posso, setPosso] = useState("");

  const [loading, setLoading] = useState(false);

  const { width, height } = useWindowSize();

  const [showConfetti, setShowConfetti] = useState(false);

  const handleNameChange = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const addNameInput = () => {
    if (names.length < 6) {
      // Main guest + 5 additional
      setNames([...names, ""]);
    }
  };

  const removeNameInput = (index) => {
    if (names.length > 1) {
      // Always keep at least one input
      const newNames = names.filter((_, i) => i !== index);
      setNames(newNames);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log({
      names,
      attending,
      message,
    });

    alert("Obrigado por seu RSVP! (Este é um formulário de exemplo)");

    if (posso === "sim") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // Reset form
    setNames([""]);
    setAttending("");
    setMessage("");
    setPosso("");

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <section className={styles["rsvp-form"]}>
      <h2>Confirme sua Presença</h2>
      <p>Por favor, responda até 31 de janeiro de 2026</p>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">
            Seu Nome Completo e de seus acompanhantes:
          </label>
          {names.map((name, index) => (
            <div key={index} className={`${styles["name-input-group"]}`}>
              <InputText
                className={`${styles.inputtexto} p-inputtext-lg`}
                id={`name-${index}`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={
                  index === 0 ? "Seu nome completo" : "Nome do acompanhante"
                }
                required
              />
              {index > 0 && (
                <Button
                  className={styles.butaoCancelar}
                  icon="pi pi-times"
                  severity="danger"
                  aria-label="Cancel"
                  onClick={() => removeNameInput(index)}
                />
              )}
            </div>
          ))}
          {names.length < 6 && (
            <Button
              className={`${styles.butaon}`}
              type="button"
              icon="pi pi-plus"
              severity="success"
              label="Adicionar acompanhante"
              onClick={addNameInput}
              style={{ marginTop: "10px" }}
            />
          )}
        </div>

        <div className={styles["form-group"]}>
          <label>Você irá comparecer?</label>
          <div className={styles.checkbox}>
            <div className="flex align-items-center">
              <label htmlFor="sim" className="ml-2">
                <RadioButton
                  inputId="sim"
                  name="sim"
                  value="sim"
                  onChange={(e) => setPosso(e.value)}
                  checked={posso === "sim"}
                />{" "}
                Sim, irei!
              </label>
            </div>
            <div className="flex align-items-center">
              <label htmlFor="nao" className="ml-2">
                <RadioButton
                  inputId="nao"
                  name="nao"
                  value="nao"
                  onChange={(e) => setPosso(e.value)}
                  checked={posso === "nao"}
                />{" "}
                Não poderei comparecer
              </label>
            </div>
          </div>
        </div>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            colors={["#FFF", "#577590"]}
            numberOfPieces={300}
            gravity={0.25}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
        )}
        <div className={styles["form-group"]}>
          <label htmlFor="message">Deixe uma mensagem para os noivos:</label>
          <i>Opcional</i>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            maxLength="365"
          ></textarea>
        </div>

        {posso ? (
          <Button
            className={`p-button-success p-button-sm ${styles.inputEnviar}`}
            type="submit"
            label="Enviar"
            icon="pi pi-check"
            loading={loading}
            disabled={loading}
          />
        ) : (
          <></>
        )}
      </form>
    </section>
  );
}

export default RSVPForm;
