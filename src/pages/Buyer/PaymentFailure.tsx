import { Link, useSearchParams } from "react-router-dom";

export const PaymentFailure = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white border border-[#E0D6CC] p-12 text-center">
                    {/* Error Icon */}
                    <div className="text-6xl mb-6">✕</div>

                    <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#2C2420] mb-4">
                        Pago Rechazado
                    </h1>

                    <p className="text-sm text-[#7A6B5A] font-sans-elegant mb-8">
                        Lamentablemente no pudimos procesar tu pago. No se realizó ningún
                        cargo.
                    </p>

                    {/* Info */}
                    <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-8 mb-8 text-left">
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-[#2C2420] mb-4">
                            ¿Qué pudo haber pasado?
                        </h3>
                        <ul className="text-sm text-[#7A6B5A] font-sans-elegant space-y-3 leading-relaxed">
                            <li>• Fondos insuficientes en la tarjeta o cuenta</li>
                            <li>• Datos de la tarjeta ingresados incorrectamente</li>
                            <li>• Tu banco rechazó la transacción</li>
                            <li>• El medio de pago seleccionado no está habilitado</li>
                        </ul>

                        {paymentId && (
                            <p className="text-xs text-[#7A6B5A] font-sans-elegant mt-6">
                                ID de referencia: {paymentId} · Estado: {status}
                            </p>
                        )}
                    </div>

                    {/* Recommendations */}
                    <div className="bg-[#F5F0EB] border border-[#E0D6CC] p-8 mb-8 text-left">
                        <h3 className="font-sans-elegant text-sm uppercase tracking-wide text-[#2C2420] mb-4">
                            💡 Te recomendamos
                        </h3>
                        <ul className="text-sm text-[#7A6B5A] font-sans-elegant space-y-3 leading-relaxed">
                            <li>✓ Verificar los datos de tu medio de pago</li>
                            <li>✓ Intentar con otro medio de pago</li>
                            <li>✓ Contactar a tu banco si el problema persiste</li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/cart" className="flex-1">
                            <button className="w-full py-4 bg-[#2C2420] text-white font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#333333] transition-all duration-300">
                                Reintentar Compra
                            </button>
                        </Link>
                        <Link to="/" className="flex-1">
                            <button className="w-full py-4 border border-[#2C2420] text-[#2C2420] font-sans-elegant text-xs tracking-[0.2em] uppercase hover:bg-[#2C2420] hover:text-white transition-all duration-300">
                                Volver al Inicio
                            </button>
                        </Link>
                    </div>

                    {/* Support */}
                    <div className="mt-10 pt-8 border-t border-[#E0D6CC]">
                        <p className="text-xs text-[#7A6B5A] font-sans-elegant">
                            ¿Necesitas ayuda?{" "}
                            <Link to="/contact" className="text-[#2C2420] hover:underline">
                                Contáctanos
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
