import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './axiosApi';
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';
import CategoryForm from './CategoryForm';  // Certifique-se de que isso está importado corretamente

const EditCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Pega o id da categoria via URL
    const { id: idCategoria } = useParams();

    // Verifique se idCategoria é válido
    useEffect(() => {
        if (!idCategoria) {
            navigate("/categories");
        } else {
            loadCategoryById(idCategoria);
        }
    }, [idCategoria, navigate]);

    // Função para carregar os dados da categoria pelo ID
    const loadCategoryById = (id) => {
        setLoading(true);
        const getCategoryEndpoint = `admin/obter_categoria/${id}`;
        api.get(getCategoryEndpoint)
            .then(response => {
                setInputs(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar categoria:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Função para salvar as alterações da categoria
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        // Validação para garantir que os campos obrigatórios estão preenchidos
        if (!inputs.nome || !inputs.descricao || !inputs.id) {
            setErrors({
                nome: !inputs.nome ? "O nome da categoria é obrigatório." : undefined,
                descricao: !inputs.descricao ? "A descrição é obrigatória." : undefined,
                id: !inputs.id ? "O ID da categoria é obrigatório." : undefined,
            });
            setLoading(false);
            return;
        }
    
        // Garantir que o id_categoria está presente
        const requestData = {
            id_categoria: inputs.id,  // Garantir que o campo correto seja enviado
            nome: inputs.nome,
            descricao: inputs.descricao,
        };
    
        console.log("Dados que estão sendo enviados:", requestData);
    
        const editCategoryEndpoint = "admin/alterar_categoria";
        try {
            const response = await api.post(editCategoryEndpoint, requestData);
            if (response.status === 204) {
                navigate("/categories");
            } else {
                console.log(response);
            }
        } catch (error) {
            if (error?.response?.data) {
                console.log("Erro:", error.response.data); // Verifique o conteúdo da resposta de erro
                setErrors(parseErrors(error.response.data));
            }
        } finally {
            setLoading(false);
        }
    };
    

    // Função para atualizar os valores dos inputs
    const localHandleChange = (event) => {
        handleChange(event, inputs, setInputs);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração de Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" className="mb-3">
                {/* Usando o CategoryForm para capturar as informações da categoria */}
                <CategoryForm handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
};

export default EditCategory;
