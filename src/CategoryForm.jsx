import PropTypes from 'prop-types';
import CleaveInput from "./CleaveInput"; // Se necessário para formatação
import FormInput from "./FormInput";    // Para campos de texto simples
import FormTextarea from "./FormTextarea"; // Para campos de texto multilinha

const CategoryForm = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput
                        type="text"
                        field="nome"
                        label="Nome da Categoria"
                        value={inputs?.nome}
                        onChange={handleChange}
                        error={errors?.nome}
                        autofocus={true}
                    />
                </div>

                <div className="col-12 mb-3">
                    <FormTextarea
                        field="descricao"
                        label="Descrição"
                        value={inputs?.descricao}
                        onChange={handleChange}
                        error={errors?.descricao}
                    />
                </div>

                {/* Adicionando CleaveInput ou outros campos adicionais, se necessário */}
                {/* Exemplo de um campo de número com formatação (caso necessário) */}
                {/* Exemplo abaixo, pode ser modificado conforme as necessidades */}

                {/* <div className="col-6 mb-3">
                    <CleaveInput
                        type="text"
                        field="codigo"
                        label="Código da Categoria"
                        value={inputs?.codigo}
                        onChange={handleChange}
                        error={errors?.codigo}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                            delimiter: '.',
                            numeralDecimalMark: ','
                        }}
                    />
                </div> */}
 
            </div>
        </>
    );
};

CategoryForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    inputs: PropTypes.object,
    errors: PropTypes.object
};

export default CategoryForm;
