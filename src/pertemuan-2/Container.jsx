export default function Container({children}){
    return(
        <div className="card">
                {children}      
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )
}