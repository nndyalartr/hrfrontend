import "./onboard.css"
interface Props {
    setActiveTabKey: (key: string) => void;
    name :string
}
const PersonelIdDetails: React.FC<Props> = ({ setActiveTabKey, name }) => {
    return (
        <>
        <h4 className="text_left">Hi {name}, Please Update Personel Details</h4>
        </>
    )
}
export default PersonelIdDetails;