import '../../styles/components/Suggest.css'

const Suggest = () => {

  
  

    const cards = [
        {
          image: "https://d8nffddmkwqeq.cloudfront.net/store/8f644dc4%2C1d3f%2C4e41%2C99ca%2C8db7a556b288",
          title: "웨이브메이크 x 브링그린",
          subtitle: "오징어게임2 팝업스토어 n 성수",
        },
        {
          image: "https://d8nffddmkwqeq.cloudfront.net/store/dedcb81f%2Cbd13%2C44b7%2Cbc6f%2C2e26943bbd98",
          title: "웨이브메이크 x 브링그린",
          subtitle: "오징어게임2 팝업스토어 n 성수",
        },
        {
          image: "https://d8nffddmkwqeq.cloudfront.net/store/dedcb81f%2Cbd13%2C44b7%2Cbc6f%2C2e26943bbd98",
          title: "웨이브메이크 x 브링그린",
          subtitle: "오징어게임2 팝업스토어 n 성수",
        },
        {
          image: "https://d8nffddmkwqeq.cloudfront.net/store/dedcb81f%2Cbd13%2C44b7%2Cbc6f%2C2e26943bbd98",
          title: "웨이브메이크 x 브링그린",
          subtitle: "오징어게임2 팝업스토어 n 성수",
        },
      ];
    return (
        <div>
 <div className="suggest-card-grid">
 
          
      {cards.map((card, index) => (
        
         <div className="suggest-card"key={index}>
            
         <img src={card.image} alt={card.title} className="card-image" />
         <div className="suggest-card-overlay">
           <h3 className="suggest-card-title">{card.title}</h3>
           <p className="suggest-card-subtitle">{card.subtitle}</p>
         </div>
       </div>
      ))}
    </div>
        </div>
    )

}

export default Suggest

