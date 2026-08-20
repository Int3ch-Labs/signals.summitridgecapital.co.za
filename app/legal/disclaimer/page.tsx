import LegalPage from "@/app/legal/LegalPage";

export const metadata = {
  title: "Risk Disclaimer | Summit Ridge Capital Signals",
  description:
    "Important trading and financial risk disclaimer for Summit Ridge Capital Signals.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal · Risk"
      title="Risk Disclaimer"
      description="Important information concerning trading risk, model-generated signals and your responsibility for trading decisions."
      lastUpdated="20 August 2026"
    >
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="mt-0! font-semibold text-amber-900">
          Important: Trading involves substantial risk.
        </p>

        <p className="mt-2! text-amber-800">
          You may lose some or all of the capital you commit to trading.
          Summit Ridge Capital Signals does not guarantee profits or protection
          from losses.
        </p>
      </div>

      <h2>1. Informational service only</h2>

      <p>
        Summit Ridge Capital Signals provides model-generated market signals
        and related information for informational and educational purposes.
      </p>

      <p>
        Our signals are not intended to constitute financial advice,
        investment advice, portfolio management, trading instructions or a
        recommendation to buy, sell or hold any financial instrument.
      </p>

      <h2>2. No guarantee of results</h2>

      <p>
        No representation or guarantee is made that any signal, model,
        prediction, strategy or market analysis will be accurate, profitable
        or suitable for your circumstances.
      </p>

      <p>
        Financial markets are uncertain and market conditions can change
        rapidly. A model may produce incorrect, delayed or incomplete
        information.
      </p>

      <h2>3. Model-generated information</h2>

      <p>
        Signals may be generated using statistical models, machine-learning
        systems, historical market data, technical indicators and other
        quantitative inputs.
      </p>

      <p>
        Model outputs can contain errors. Historical data and historical model
        performance are not guarantees of future results.
      </p>

      <h2>4. Your trading decisions</h2>

      <p>
        You remain solely responsible for deciding whether to enter, modify or
        exit a trade.
      </p>

      <p>
        You should independently evaluate any information provided by the
        service and consider your financial circumstances, objectives, risk
        tolerance and level of experience before trading.
      </p>

      <h2>5. Stop-loss and target levels</h2>

      <p>
        Any entry, stop-loss, target or other price level displayed by the
        platform is an output of the service and should not be understood as a
        guarantee that a particular price will be reached.
      </p>

      <p>
        Market prices may move rapidly, gap or become temporarily unavailable.
        Actual execution may differ materially from any price displayed by the
        platform.
      </p>

      <h2>6. Execution risk</h2>

      <p>
        Summit Ridge Capital does not execute trades on your behalf unless a
        separate service explicitly states otherwise.
      </p>

      <p>
        Execution depends on your broker, exchange, liquidity provider,
        internet connection, market conditions and other external factors.
      </p>

      <h2>7. Leverage</h2>

      <p>
        Leveraged trading can significantly increase both potential gains and
        potential losses. Losses can exceed the amount you initially expect
        to risk depending on the financial product and trading arrangement.
      </p>

      <h2>8. No suitability assessment</h2>

      <p>
        Unless expressly stated otherwise, Summit Ridge Capital does not
        perform a personalised assessment of whether a particular trade,
        instrument or strategy is appropriate for you.
      </p>

      <h2>9. Third-party brokers and platforms</h2>

      <p>
        Summit Ridge Capital Signals is separate from your broker or trading
        platform. We are not responsible for the operation, availability,
        pricing, execution, security or policies of third-party brokers,
        exchanges or other external services.
      </p>

      <h2>10. Regulatory status</h2>

      <p>
        Nothing on this website should be interpreted as a representation that
        Summit Ridge Capital Signals provides a regulated financial advisory,
        portfolio-management or dealing service unless expressly stated and
        authorised under applicable law.
      </p>

      <h2>11. Seek professional advice</h2>

      <p>
        If you are uncertain about the financial, legal, tax or regulatory
        consequences of trading, you should obtain advice from an
        appropriately qualified and authorised professional.
      </p>

      <h2>12. Acceptance</h2>

      <p>
        By using Summit Ridge Capital Signals, you acknowledge that you
        understand the risks associated with trading and that you are
        responsible for your own trading decisions.
      </p>
    </LegalPage>
  );
}